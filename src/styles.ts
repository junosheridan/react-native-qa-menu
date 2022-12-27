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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Metrics.tiny,
  },
  headerTitle: {
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    left: Metrics.massive * 1.5,
    right: Metrics.massive * 1.5,
  },
  scrollContent: {
    paddingHorizontal: Metrics.small,
  },
  section: {
    marginTop: Metrics.large,
  },
  sectionTitle: {
    fontSize: 20,
    paddingVertical: Metrics.tiny / 2,
    backgroundColor: Colors.lavender,
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
    backgroundColor: Colors.white,
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
    color: Colors.midnightBlue,
  },
  infoDescription: {
    fontSize: 14,
    color: Colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logItemContainer: {
    paddingVertical: Metrics.small,
    paddingHorizontal: Metrics.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logItemTimestamp: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  logItemMessage: {
    marginVertical: Metrics.tiny,
    fontSize: 14,
  },
  logItemCopyButton: {
    height: Metrics.xl,
    marginVertical: 0,
  },
})
