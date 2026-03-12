from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import get_db
from ..schemas import LancamentoIn, LancamentoOut
from ..services.lancamentos import criar_lancamento

router = APIRouter(prefix="/lancamentos", tags=["Lançamentos"])


@router.post("", response_model=LancamentoOut, status_code=status.HTTP_201_CREATED)
def post_lancamento(payload: LancamentoIn, db: Session = Depends(get_db)):
    try:
        transacao = criar_lancamento(db, payload)
        return LancamentoOut(
            id=transacao.id,
            tipo_lancamento=transacao.tipo_lancamento.value,
            mensagem="Lançamento registrado com sucesso."
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao registrar lançamento: {str(e)}"
        )