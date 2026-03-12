from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import UsuarioAdmin, AcessoCliente
from ..schemas import LoginIn, TokenOut
from ..auth import verificar_senha, criar_access_token
from ..deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/admin/login", response_model=TokenOut)
def login_admin(payload: LoginIn, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioAdmin).filter(UsuarioAdmin.email == payload.email).first()

    if not usuario or not usuario.ativo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas."
        )

    if not verificar_senha(payload.senha, usuario.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas."
        )

    token = criar_access_token({
        "sub": str(usuario.id),
        "email": usuario.email,
        "perfil": "admin",
        "nome": usuario.nome,
    })

    return TokenOut(
        access_token=token,
        token_type="bearer",
        perfil="admin",
        nome=usuario.nome,
        email=usuario.email,
    )


@router.post("/cliente/login", response_model=TokenOut)
def login_cliente(payload: LoginIn, db: Session = Depends(get_db)):
    acesso = db.query(AcessoCliente).filter(AcessoCliente.email == payload.email).first()

    if not acesso or not acesso.ativo:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas."
        )

    if not verificar_senha(payload.senha, acesso.senha_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas."
        )

    acesso.ultimo_login_em = datetime.utcnow()
    db.commit()
    db.refresh(acesso)

    token = criar_access_token({
        "sub": str(acesso.cliente_id),
        "email": acesso.email,
        "perfil": "cliente",
        "nome": acesso.cliente.nome,
    })

    return TokenOut(
        access_token=token,
        token_type="bearer",
        perfil="cliente",
        nome=acesso.cliente.nome,
        email=acesso.email,
    )


@router.get("/me")
def me(usuario=Depends(get_current_user)):
    return usuario