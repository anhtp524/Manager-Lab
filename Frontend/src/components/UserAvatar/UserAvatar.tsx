import { Avatar } from 'antd'
import { AvatarSize } from 'antd/es/avatar/AvatarContext'

export interface IUserAvatarProps {
  name?: string
  size?: AvatarSize
}

const shortenAvatarName = (name?: string) => {
  let userName = name || 'Unknown User'
  const nameParts = userName.split(' ')
  const firstNameLetter = nameParts[0] ? nameParts[0][0] : ''
  const lastNameLetter = nameParts[1] ? nameParts[1][0] : ''

  return firstNameLetter.toUpperCase() + lastNameLetter.toUpperCase()
}

export const stringToColour = (str?: string) => {
  let string = str || 'Unknown'
  let hash = 0
  string.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}

export function addAlpha(color: string, opacity: number = 0.18) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return color + _opacity.toString(16).toUpperCase()
}

function UserAvatar(props: IUserAvatarProps) {
  const { name, size } = props
  return (
    <Avatar
      style={{ backgroundColor: stringToColour(name), verticalAlign: 'middle', fontWeight: 600 }}
      size={size || 'default'}
    >
      {shortenAvatarName(name)}
    </Avatar>
  )
}

export default UserAvatar
