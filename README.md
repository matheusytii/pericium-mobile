# Pericium Mobile
Uma plataforma completa e segura para gestão de laudos periciais odontológicos, com acesso via Web e Mobile.
Permite o registro, análise e identificação forense de forma centralizada, eficiente e moderna.

---
## Visão Geral
Este aplicativo foi desenvolvido para atender demandas da Odontologia Legal, oferecendo ferramentas que facilitam:
- Cadastro de vítimas e casos.
- Registro e análise de evidências.
- Visualização de odontogramas.
- Geração e gerenciamento de laudos periciais.
- Integração com câmera para coleta de evidências visuais.
- Acesso multiplataforma (Web e Mobile).

---
## Funcionalidades
- Autenticação com JWT
- Gerenciamento de vítimas e casos
- Odontograma interativo
- Captura e upload de evidências
- Geração de laudos digitais
- Interface moderna com Tailwind CSS
- Compatível com dispositivos móveis (React Native + Expo)

---
## Estrutura do Projeto
src/ <br>
├── app/                # Páginas principais do app (casos, odontograma, evidências, vítimas, etc.) <br>
├── assets/images/      # Imagens do aplicativo <br>
├── context/            # Contextos globais (ex: AuthContext) <br>
├── interface/          # Interfaces e modelos de dados <br>
├── navigation/         # Configuração de rotas e navegação <br>
├── service/            # Serviços e integração com APIs <br>
├── styles/             # Estilos personalizados <br>
├── types/              # Tipagens compartilhadas (roles, status, CPF, etc.) <br>

---
## Tecnologias Utilizadas
- React Native (Expo)
- TypeScript
- Tailwind CSS / NativeWind
- Context API
- JWT para autenticação
- Camera do dispositivo (expo-camera)
- Armazenamento seguro

---
## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/matheusytii/pericium-mobile
```

---

2. Instale as dependências:
```bash
npm install
```
--- 

3. Inicie o app:
```bash
npx expo start
```
---
4. Baixe o Expo Go e escaneie o QR-Code gerava
