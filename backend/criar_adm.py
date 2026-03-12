from app.db import SessionLocal
from app.models import UsuarioAdmin
from app.auth import gerar_hash_senha

db = SessionLocal()

email = "admin@locmoto.com"
senha = "123456"
nome = "Administrador"

existe = db.query(UsuarioAdmin).filter(UsuarioAdmin.email == email).first()

if existe:
    print("Admin já existe.")
else:
    admin = UsuarioAdmin(
        nome=nome,
        email=email,
        senha_hash=gerar_hash_senha(senha),
        ativo=True,
    )
    db.add(admin)
    db.commit()
    print("Admin criado com sucesso.")