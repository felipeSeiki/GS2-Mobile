# WorkTree - Plataforma de Recrutamento Inteligente

**Global Solution 2º Semestre – FIAP 2024**  
**DISRUPTIVE ARCHITECTURES: IOT, IOB & GENERATIVE IA**

## 👥 Desenvolvido por:
- **Felipe Seiki Hashiguti** - RM: 98985
- **Lucas Corradini Silveira** - RM: 555118  
- **Matheus Gregorio Mota** - RM: 557254

## 📱 Sobre o Projeto

WorkTree é uma plataforma mobile de recrutamento que conecta candidatos e empresas com análise de compatibilidade automatizada usando IA Generativa (Google Gemini 2.0 Flash).

### Principais Funcionalidades:
- 🔐 **Autenticação** - Sistema dual (Candidato/Empresa)
- 💼 **Gestão de Vagas** - Empresas criam e gerenciam vagas
- 👤 **Perfil de Candidato** - Cadastro completo com experiências e habilidades
- 🤖 **Análise de Compatibilidade com IA** - Score automático candidato-vaga
- 📊 **Recomendações Personalizadas** - Sugestões de desenvolvimento profissional

## 🚀 Tecnologias Utilizadas

### Frontend (Mobile):
- **React Native** com Expo
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **Styled Components** para estilização
- **AsyncStorage** para persistência local

### Backend (API IA):
- **Python Flask** - API REST
- **Google Gemini 2.0 Flash** - Análise de compatibilidade
- **Render** - Deploy em produção
- **API URL**: https://ia-8xoy.onrender.com

## 📋 Como Executar o Projeto

### 📹 Vídeo de Demonstração
**Assista ao vídeo completo do projeto**: [https://youtu.be/Wmu85CaLhuA](https://youtu.be/Wmu85CaLhuA)

### ⚙️ Configuração do Ambiente

#### Pré-requisitos:
Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** - [Download](https://git-scm.com/)
- **Expo Go** no dispositivo móvel:
  - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Verificando as Instalações:
```bash
# Verificar versão do Node.js
node --version
# Saída esperada: v16.x.x ou superior

# Verificar versão do npm
npm --version
# Saída esperada: 8.x.x ou superior

# Verificar instalação do Git
git --version
# Saída esperada: git version 2.x.x
```

### 🚀 Passo a Passo para Rodar o Projeto

#### 1. Clone o Repositório
```bash
git clone https://github.com/felipeSeiki/GS2-Mobile.git
```

#### 2. Acesse o Diretório do Projeto
```bash
cd GS2-Mobile
```

#### 3. Instale as Dependências
```bash
# Usando npm
npm install

# OU usando yarn
yarn install
```

**Nota**: Este processo pode levar alguns minutos dependendo da sua conexão com a internet.

#### 4. Inicie o Servidor de Desenvolvimento
```bash
# Usando npm
npm start

# OU usando yarn
yarn start

# OU diretamente com Expo
npx expo start
```

#### 5. Execute no Dispositivo

##### **Opção A: Usando Expo Go (Recomendado para Testes)**
1. Após executar `npm start`, um QR Code será exibido no terminal
2. Abra o **Expo Go** no seu smartphone
3. Escaneie o QR Code:
   - **Android**: Use o scanner do Expo Go
   - **iOS**: Use a câmera nativa do iPhone
4. Aguarde o carregamento do aplicativo

##### **Opção B: Usando Emulador Android**
```bash
# Certifique-se de ter o Android Studio instalado
npx expo start --android

# OU pressione 'a' no terminal após 'npm start'
```

##### **Opção C: Usando Simulador iOS** (somente macOS)
```bash
# Certifique-se de ter o Xcode instalado
npx expo start --ios

# OU pressione 'i' no terminal após 'npm start'
```

### 🔧 Comandos Úteis

```bash
# Iniciar o projeto
npm start

# Iniciar com cache limpo (resolver problemas)
npm start -- --clear
# OU
npx expo start --clear

# Abrir no Android
npm run android
# OU
npx expo start --android

# Abrir no iOS (somente macOS)
npm run ios
# OU
npx expo start --ios

# Abrir no navegador web
npm run web
# OU
npx expo start --web
```

### 🛠️ Solução de Problemas Comuns

#### Erro: "Metro Bundler não inicia"
```bash
# Limpe o cache e reinstale
rm -rf node_modules
npm install
npx expo start --clear
```

#### Erro: "Porta 8081 em uso"
```bash
# O Expo automaticamente sugerirá outra porta
# OU mate o processo na porta 8081
# Linux/Mac:
lsof -ti:8081 | xargs kill -9

# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

#### Erro: "Unable to resolve module"
```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

#### Pacotes Expo desatualizados
```bash
# Atualize para as versões corretas
npm install expo@~54.0.25 expo-updates@~29.0.13
```

### 🔐 Credenciais de Teste:
- **Candidato**: Qualquer email válido (mock)
- **Empresa**: Qualquer email válido (mock)

### 📋 Funcionalidades Implementadas:
- ✅ Autenticação dual (Candidato/Empresa)
- ✅ CRUD completo de vagas
- ✅ Perfil de candidato com experiências
- ✅ **Análise de Compatibilidade com IA** (integração com API)
- ✅ Visualização de score e recomendações
- ✅ Navegação completa entre telas
- ✅ Persistência de dados local

## 🤖 Integração com IA

### API de Análise de Compatibilidade
- **Endpoint**: https://ia-8xoy.onrender.com/api/analyze-compatibility
- **Modelo**: Google Gemini 2.0 Flash
- **Método**: POST com dados do candidato e vaga
- **Resposta**: Score de compatibilidade (0-100%), habilidades, recomendações

### Campos Retornados:
```json
{
  "compatibility_score": 85,
  "compatibility_level": "Alto",
  "matching_skills": ["React", "Node.js"],
  "missing_skills": ["SQL"],
  "strengths": [...],
  "areas_for_improvement": [...],
  "recommendations": [...],
  "next_steps": "..."
}
```

## 🌐 Links Importantes

| Recurso | Link | Descrição |
|---------|------|-----------|
| **📹 Vídeo Demo** | [YouTube](https://youtu.be/Wmu85CaLhuA) | Demonstração completa do projeto |
| **📱 Repositório Mobile** | [GitHub - GS2-Mobile](https://github.com/felipeSeiki/GS2-Mobile) | Código fonte do app React Native |
| **🤖 Repositório API IA** | [GitHub - IA](https://github.com/felipeSeiki/IA) | API Python com Gemini 2.0 Flash |
| **🚀 API em Produção** | [Render - API](https://ia-8xoy.onrender.com/api/health) | Endpoint de health check |
| **📚 Expo Project** | [Expo Dashboard](https://expo.dev/accounts/felipeseiki/projects/WorkTree) | Projeto no Expo |

---

## 🎯 Status do Projeto

✅ **App Mobile Funcional** - Navegação completa  
✅ **API IA Deployada** - Gemini 2.0 Flash integrado  
✅ **Análise de Compatibilidade** - Score automático funcionando  
✅ **Documentação Completa** - README e código comentado  
✅ **Pronto para Apresentação** - Global Solution 2º Semestre