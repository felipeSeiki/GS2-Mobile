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

### Pré-requisitos
- Node.js 16+
- Expo Go instalado no dispositivo móvel

### Instalação
```bash
# Clone o repositório
git clone https://github.com/felipeSeiki/GS2-Mobile.git

# Entre no diretório
cd GS2-Mobile

# Instale as dependências
npm install

# Execute o projeto
npm start
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

| Recurso | Link |
|---------|------|
| **📱 Repositório Mobile** | [GitHub - GS2-Mobile](https://github.com/felipeSeiki/GS2-Mobile) |
| **🤖 Repositório API IA** | [GitHub - IA](https://github.com/felipeSeiki/IA) |
| **🚀 API em Produção** | [Render - API](https://ia-8xoy.onrender.com/api/health) |

---

## 🎯 Status do Projeto

✅ **App Mobile Funcional** - Navegação completa  
✅ **API IA Deployada** - Gemini 2.0 Flash integrado  
✅ **Análise de Compatibilidade** - Score automático funcionando  
✅ **Documentação Completa** - README e código comentado  
✅ **Pronto para Apresentação** - Global Solution 2º Semestre