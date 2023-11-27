import UserAvatar from '~/components/UserAvatar/UserAvatar'

export interface IConversationProps {
  name: string
  onClick: VoidFunction
}

function Conversation({ name, onClick }: IConversationProps) {
  return (
    <div className='conversation' onClick={onClick}>
      <div className='profile-avatar'>
        <UserAvatar name={name} size='large' />
      </div>
      <div className='profile-info'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <strong>{name}</strong>
        </div>
      </div>
    </div>
  )
}

export default Conversation
