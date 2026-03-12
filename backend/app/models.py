from datetime import date, datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import (
    BigInteger,
    Date,
    DateTime,
    Enum as SAEnum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Boolean,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


class TipoLancamento(str, Enum):
    MANUTENCAO = "MANUTENCAO"
    DESPESA_DIVERSA = "DESPESA_DIVERSA"


class Veiculo(Base):
    __tablename__ = "veiculos"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    placa: Mapped[str] = mapped_column(String(10), unique=True, nullable=False)
    chassi: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)
    renavam: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    valor_compra: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    descricao: Mapped[str | None] = mapped_column(String(150), nullable=True)
    km_atual: Mapped[int] = mapped_column(Integer, default=0, nullable=False)


class TransacaoFinanceira(Base):
    __tablename__ = "transacoes_financeiras"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    tipo_lancamento: Mapped[TipoLancamento] = mapped_column(
        SAEnum(TipoLancamento, name="tipo_lancamento_enum"),
        nullable=False
    )
    veiculo_id: Mapped[int | None] = mapped_column(
        ForeignKey("veiculos.id", ondelete="SET NULL", onupdate="CASCADE"),
        nullable=True
    )
    data: Mapped[date] = mapped_column(Date, nullable=False)
    valor: Mapped[Decimal] = mapped_column(Numeric(12, 2), nullable=False)
    descricao: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.utcnow)

    veiculo: Mapped["Veiculo | None"] = relationship()
    manutencao_detalhe: Mapped["ManutencaoDetalhe | None"] = relationship(
        back_populates="transacao",
        uselist=False,
        cascade="all, delete-orphan"
    )


class ManutencaoDetalhe(Base):
    __tablename__ = "manutencao_detalhes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    transacao_id: Mapped[int] = mapped_column(
        ForeignKey("transacoes_financeiras.id", ondelete="CASCADE", onupdate="CASCADE"),
        unique=True,
        nullable=False
    )
    km_atual: Mapped[int] = mapped_column(Integer, nullable=False)
    tipo_servico: Mapped[str] = mapped_column(Text, nullable=False)

    transacao: Mapped["TransacaoFinanceira"] = relationship(back_populates="manutencao_detalhe")
    
class Cliente(Base):
    __tablename__ = "clientes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    cpf: Mapped[str] = mapped_column(String(14), unique=True, nullable=False)
    cnh: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    validade_cnh: Mapped[date] = mapped_column(Date, nullable=False)

    acesso: Mapped["AcessoCliente | None"] = relationship(
        back_populates="cliente",
        uselist=False
    )


class UsuarioAdmin(Base):
    __tablename__ = "usuarios_admin"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    senha_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    ativo: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.utcnow)


class AcessoCliente(Base):
    __tablename__ = "acessos_clientes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    cliente_id: Mapped[int] = mapped_column(
        ForeignKey("clientes.id", ondelete="CASCADE", onupdate="CASCADE"),
        unique=True,
        nullable=False
    )
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False)
    senha_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    ativo: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    ultimo_login_em: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime | None] = mapped_column(DateTime, default=datetime.utcnow)

    cliente: Mapped["Cliente"] = relationship(back_populates="acesso")