from datetime import date
from decimal import Decimal
from typing import Literal, Union, Annotated
from pydantic import BaseModel, EmailStr

from pydantic import BaseModel, Field


class LancamentoBase(BaseModel):
    data: date
    valor: Decimal = Field(gt=0)
    veiculo_id: int | None = None


class LancamentoManutencaoIn(LancamentoBase):
    tipo_lancamento: Literal["MANUTENCAO"]
    veiculo_id: int
    servico_prestado: str = Field(min_length=3)
    km_atual: int = Field(ge=0)


class LancamentoDespesaIn(LancamentoBase):
    tipo_lancamento: Literal["DESPESA_DIVERSA"]
    descricao: str = Field(min_length=3)
    veiculo_id: int | None = None

class LoginIn(BaseModel):
    email: EmailStr
    senha: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str
    perfil: str
    nome: str
    email: str
    
LancamentoIn = Annotated[
    Union[LancamentoManutencaoIn, LancamentoDespesaIn],
    Field(discriminator="tipo_lancamento")
]


class LancamentoOut(BaseModel):
    id: int
    tipo_lancamento: str
    mensagem: str