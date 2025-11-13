import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  jobHeader: {
    flexDirection: 'row',
    paddingVertical: 24,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#4A9EFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  companyInitial: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 32,
  },
  companyName: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  appliedButton: {
    backgroundColor: '#4A4A4A',
    opacity: 0.7,
  },
  jobLocation: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#4A9EFF',
    marginRight: 8,
    marginTop: 2,
  },
  requirementText: {
    fontSize: 16,
    color: '#CCCCCC',
    flex: 1,
    lineHeight: 22,
  },
});