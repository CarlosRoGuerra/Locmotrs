from app.db import SessionLocal
from app.models import Cliente, AcessoCliente
from app.auth import gerar_hash_senha

db = SessionLocal()

cliente_id = 1
email = "cliente@locmoto.com"
senha = "123456"

cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()

if not cliente:
    print("Cliente não encontrado.")
else:
    existe = db.query(AcessoCliente).filter(AcessoCliente.email == email).first()
    if existe:
        print("Acesso já existe.")
    else:
        acesso = AcessoCliente(
            cliente_id=cliente_id,
            email=email,
            senha_hash=gerar_hash_senha(senha),
            ativo=True,
        )
        db.add(acesso)
        db.commit()
        print("Acesso do cliente criado com sucesso.")