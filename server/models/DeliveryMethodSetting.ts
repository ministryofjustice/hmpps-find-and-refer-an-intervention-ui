export type SettingType = 'COMMUNITY' | 'CUSTODY'

export default interface DeliveryMethodSetting {
  id: string
  setting: SettingType
}
