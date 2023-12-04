import * as PDF from '@react-pdf/renderer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import projectAPI from '~/api/project.api'
import Image from '~/assets/Image'
import { useHandlingApi } from '~/common/context/useHandlingApi'

PDF.Font.register({
  family: 'Ubuntu',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf'
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'bold'
    },
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic'
    }
  ]
})
PDF.Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
})

const Certificate = () => {
  const { id } = useParams()
  const { showLoading, closeLoading } = useHandlingApi()

  const [certInfo, setCertInfo] = useState<{
    studentName?: string
    labName?: string
    score?: number
    finishDate?: string
    feedback?: string
  }>()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const handleGenerateCertificate = async () => {
      if (id === undefined) return
      showLoading()
      try {
        const response = await projectAPI.getCertificate(id, { signal: signal })
        if (response && response.data) {
          setCertInfo((prev) => {
            return {
              ...prev,
              studentName: response.data.student.studentName,
              labName: response.data.labName,
              score: response.data.project.score,
              finishDate: response.data.project.finishDate,
              feedback: response.data.project.feedback
            }
          })
        }
      } catch (error: Dennis) {
        console.error(error)
      } finally {
        closeLoading()
      }
    }
    handleGenerateCertificate()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <PDF.PDFViewer
      width='100%'
      height='100%'
      style={{
        height: 'calc(100vh - 100px)'
      }}
      children={
        <PDF.Document style={{ fontFamily: 'Ubuntu' }}>
          <PDF.Page orientation='landscape' style={styles.page}>
            <PDF.View style={styles.certificateView}>
              <PDF.Image src={Image.cert} style={{ width: '100%', height: ' 100%' }} />
              <PDF.View style={{ position: 'absolute', width: '100%', top: 32 }}>
                <PDF.View style={{ margin: '0 auto' }}>
                  <PDF.Image
                    style={{ width: 130, height: 130, marginTop: 12 }}
                    src='https://upload.wikimedia.org/wikipedia/vi/thumb/b/bf/Logo_HUET.svg/1024px-Logo_HUET.svg.png'
                  />
                </PDF.View>
                <PDF.Text style={{ textAlign: 'center', marginTop: 32, fontSize: 24 }}>
                  Certificate of Completion
                </PDF.Text>
                <PDF.Text
                  style={{
                    textAlign: 'center',
                    fontSize: 64,
                    marginTop: 12,
                    fontWeight: 'normal',
                    fontStyle: 'italic',
                    margin: '12px 0'
                  }}
                >
                  {certInfo?.studentName}
                </PDF.Text>
                <PDF.Text style={{ textAlign: 'center', marginTop: 12 }}>
                  for successfully completing in "{certInfo?.labName}" laboratory.
                </PDF.Text>
              </PDF.View>
              <PDF.View
                style={{
                  position: 'absolute',
                  left: 60,
                  top: 400,
                  maxWidth: 250,
                  textAlign: 'justify'
                }}
              >
                <PDF.Text style={{ fontSize: 16 }}>Overall: {certInfo?.score}</PDF.Text>
                <PDF.Text style={{ fontSize: 12 }}>Mentor's comment: {certInfo?.feedback}</PDF.Text>
              </PDF.View>
              <PDF.View
                style={{
                  position: 'absolute',
                  right: 100,
                  top: 400,
                  maxWidth: 250,
                  textAlign: 'left'
                }}
              >
                <PDF.Text style={{ fontSize: 12, textAlign: 'left' }}>Finished date: {certInfo?.finishDate}</PDF.Text>
                {/* <PDF.Text style={{ fontSize: 12, textAlign: 'left' }}>Signature</PDF.Text> */}
              </PDF.View>
            </PDF.View>
          </PDF.Page>
        </PDF.Document>
      }
    ></PDF.PDFViewer>
  )
}

const styles = PDF.StyleSheet.create({
  page: {
    width: '100%',
    padding: 12,
    // backgroundColor: '#fefbef',
    fontWeight: 700
  },
  certificateView: {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
})

export default Certificate
