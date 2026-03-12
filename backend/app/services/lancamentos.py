from sqlalchemy.orm import Session

from ..models import Veiculo, TransacaoFinanceira, ManutencaoDetalhe, TipoLancamento
from ..schemas import LancamentoManutencaoIn, LancamentoDespesaIn


class ManutencaoHandler:
    @staticmethod
    def execute(db: Session, payload: LancamentoManutencaoIn) -> TransacaoFinanceira:
        veiculo = db.get(Veiculo, payload.veiculo_id)
        if not veiculo:
            raise ValueError("Veículo não encontrado para lançamento de manutenção.")

        transacao = TransacaoFinanceira(
            tipo_lancamento=TipoLancamento.MANUTENCAO,
            veiculo_id=payload.veiculo_id,
            data=payload.data,
            valor=payload.valor,
            descricao=payload.servico_prestado,
        )
        db.add(transacao)
        db.flush()

        detalhe = ManutencaoDetalhe(
            transacao_id=transacao.id,
            km_atual=payload.km_atual,
            tipo_servico=payload.servico_prestado,
        )
        db.add(detalhe)

        if payload.km_atual > veiculo.km_atual:
            veiculo.km_atual = payload.km_atual

        return transacao


class DespesaDiversaHandler:
    @staticmethod
    def execute(db: Session, payload: LancamentoDespesaIn) -> TransacaoFinanceira:
        if payload.veiculo_id is not None:
            veiculo = db.get(Veiculo, payload.veiculo_id)
            if not veiculo:
                raise ValueError("Veículo informado não encontrado.")

        transacao = TransacaoFinanceira(
            tipo_lancamento=TipoLancamento.DESPESA_DIVERSA,
            veiculo_id=payload.veiculo_id,
            data=payload.data,
            valor=payload.valor,
            descricao=payload.descricao,
        )
        db.add(transacao)
        db.flush()

        return transacao


HANDLERS = {
    "MANUTENCAO": ManutencaoHandler,
    "DESPESA_DIVERSA": DespesaDiversaHandler,
}


def criar_lancamento(db: Session, payload):
    handler = HANDLERS[payload.tipo_lancamento]

    try:
        with db.begin():
            transacao = handler.execute(db, payload)
        db.refresh(transacao)
        return transacao
    except Exception:
        db.rollback()
        raise