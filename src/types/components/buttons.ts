export interface BaseButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  loading?: boolean
}

export interface PrimaryButtonProps extends BaseButtonProps {}
