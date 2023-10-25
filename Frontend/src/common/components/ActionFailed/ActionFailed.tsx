import { CloseCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'

export interface IActionFailedProps {
  open: boolean
  onClose: VoidFunction
}

function ActionFailed({ open, onClose }: IActionFailedProps) {
  return (
    <div>
      <Modal
        title={
          <div>
            <CloseCircleFilled style={{ color: '#e30000', marginRight: '8px' }} />
            <span>Action failed</span>
          </div>
        }
        centered
        open={open}
        width={464}
        closeIcon
        destroyOnClose
        mask={true}
        maskClosable={false}
        footer={false}
        onCancel={() => onClose()}
      >
        <p>Something wrong happens. Please contact the administrator for more detail.</p>
      </Modal>
    </div>
  )
}

export default ActionFailed
