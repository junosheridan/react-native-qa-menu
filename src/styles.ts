import { StyleSheet } from 'react-native'
import { Colors, Metrics } from './constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: Metrics.headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Metrics.small,
  },
  scrollContent: {
    paddingHorizontal: Metrics.small,
  },
  section: {
    marginTop: Metrics.large,
  },
  sectionTitle: {
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  sectionContent: {
    marginVertical: Metrics.xxs,
  },
  actionButton: {
    borderColor: Colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Metrics.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.buttonHeight,
    paddingHorizontal: Metrics.xs,
    marginVertical: Metrics.xxs,
  },
  actionButtonTitle: {
    fontSize: 14,
  },
  info: {
    marginVertical: Metrics.tiny,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoDescription: {
    fontSize: 12,
  },
})
