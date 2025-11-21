import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Header
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#999999',
  },

  // Loading
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    textAlign: 'center',
  },

  // Error
  errorContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 8,
  },

  // Score Section
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#3A3A3A',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreLevel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginTop: 4,
  },
  scoreMessageContainer: {
    flex: 1,
    marginLeft: 20,
  },
  scoreMessage: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },

  // Sections
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A9EFF',
    marginBottom: 12,
  },

  // Summary
  summary: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 22,
  },

  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  matchingSkill: {
    backgroundColor: '#4CAF5020',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  missingSkill: {
    backgroundColor: '#FF980020',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  skillText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  skillTextMissing: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },

  // Lists
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    color: '#4A9EFF',
    marginRight: 8,
    fontSize: 16,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },

  // Experience
  experienceContainer: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
  },
  experienceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  experienceLabel: {
    fontSize: 14,
    color: '#999999',
  },
  experienceValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  experienceAnalysis: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 8,
    fontStyle: 'italic',
  },

  // Recommendations
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 8,
  },
  recommendationNumber: {
    fontSize: 14,
    color: '#4A9EFF',
    fontWeight: 'bold',
    marginRight: 12,
    minWidth: 20,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },

  // Next Steps
  nextStepsSection: {
    backgroundColor: '#4A9EFF15',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4A9EFF',
  },
  nextStepsText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 22,
  },

  // Footer
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
  },
  footerText: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
});
