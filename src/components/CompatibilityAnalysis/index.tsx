import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { CompatibilityAnalysis as CompatibilityAnalysisType } from '../../types/aiAnalysis';
import { AIAnalysisService } from '../../services/aiAnalysisService';
import { styles } from './styles';

interface CompatibilityAnalysisProps {
  analysis: CompatibilityAnalysisType | null;
  loading: boolean;
  error?: string | null;
}

export const CompatibilityAnalysis: React.FC<CompatibilityAnalysisProps> = ({
  analysis,
  loading,
  error,
}) => {
  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🤖 Análise de Compatibilidade IA</Text>
          <Text style={styles.subtitle}>Powered by Google Gemini</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A9EFF" />
          <Text style={styles.loadingText}>
            Analisando compatibilidade com IA...
          </Text>
          <Text style={styles.loadingSubtext}>
            Isso pode levar alguns segundos
          </Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🤖 Análise de Compatibilidade IA</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>
            A análise de IA não está disponível no momento. Você ainda pode se candidatar normalmente.
          </Text>
        </View>
      </View>
    );
  }

  // No analysis
  if (!analysis) {
    return null;
  }

  const scoreColor = AIAnalysisService.getScoreColor(analysis.compatibility_score);
  const scoreMessage = AIAnalysisService.getScoreMessage(analysis.compatibility_score);

  return (
    <View style={[styles.container, { borderLeftColor: scoreColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🤖 Análise de Compatibilidade IA</Text>
        <Text style={styles.subtitle}>Powered by Google Gemini</Text>
      </View>

      {/* Score Section */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreCircle}>
          <Text style={[styles.scoreValue, { color: scoreColor }]}>
            {analysis.compatibility_score}%
          </Text>
          <Text style={styles.scoreLevel}>
            {analysis.compatibility_level}
          </Text>
        </View>
        <View style={styles.scoreMessageContainer}>
          <Text style={styles.scoreMessage}>{scoreMessage}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Resumo da Análise</Text>
        <Text style={styles.summary}>{analysis.summary}</Text>
      </View>

      {/* Matching Skills */}
      {analysis.matching_skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Suas Habilidades Compatíveis</Text>
          <View style={styles.skillsContainer}>
            {analysis.matching_skills.map((skill, index) => (
              <View key={index} style={[styles.skillBadge, styles.matchingSkill]}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Missing Skills */}
      {analysis.missing_skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Habilidades para Desenvolver</Text>
          <View style={styles.skillsContainer}>
            {analysis.missing_skills.map((skill, index) => (
              <View key={index} style={[styles.skillBadge, styles.missingSkill]}>
                <Text style={styles.skillTextMissing}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Strengths */}
      {analysis.strengths.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💪 Seus Pontos Fortes</Text>
          {analysis.strengths.map((strength, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{strength}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Areas for Improvement */}
      {analysis.areas_for_improvement.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Áreas para Desenvolvimento</Text>
          {analysis.areas_for_improvement.map((area, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{area}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Experience Match */}
      {analysis.experience_match && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎓 Análise de Experiência</Text>
          <View style={styles.experienceContainer}>
            <View style={styles.experienceRow}>
              <Text style={styles.experienceLabel}>Requerido:</Text>
              <Text style={styles.experienceValue}>
                ~{analysis.experience_match.required_years} anos
              </Text>
            </View>
            <View style={styles.experienceRow}>
              <Text style={styles.experienceLabel}>Você tem:</Text>
              <Text style={styles.experienceValue}>
                {analysis.experience_match.candidate_years} anos
              </Text>
            </View>
            <Text style={styles.experienceAnalysis}>
              {analysis.experience_match.analysis}
            </Text>
          </View>
        </View>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Recomendações Personalizadas</Text>
          {analysis.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Text style={styles.recommendationNumber}>{index + 1}</Text>
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Next Steps */}
      <View style={[styles.section, styles.nextStepsSection]}>
        <Text style={styles.sectionTitle}>👉 Próximo Passo</Text>
        <Text style={styles.nextStepsText}>{analysis.next_steps}</Text>
      </View>

      {/* Footer */}
      {analysis.metadata && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Análise gerada em {new Date(analysis.metadata.analyzed_at).toLocaleDateString('pt-BR')}
          </Text>
          <Text style={styles.footerText}>
            Modelo: {analysis.metadata.model_used}
          </Text>
        </View>
      )}
    </View>
  );
};
