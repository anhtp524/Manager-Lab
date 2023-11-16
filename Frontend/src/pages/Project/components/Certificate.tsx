import React from 'react'
import * as PDF from '@react-pdf/renderer'

PDF.Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
})

const MyDoc = () => (
  <PDF.Document style={{ fontFamily: 'Roboto' }}>
    <PDF.Page orientation='landscape' style={styles.page}>
      <PDF.View style={styles.certificateView}>
        <PDF.View style={{ textAlign: 'center' }}>
          <PDF.Text style={{ fontSize: 18, fontWeight: 700 }}>Cộng hòa xã hội chủ nghĩa Việt Nam</PDF.Text>
          <PDF.Text style={{ fontSize: 14 }}>Độc lập - Tự do - Hạnh phúc</PDF.Text>
        </PDF.View>
        <PDF.View style={{ margin: '0 auto' }}>
          <PDF.Image
            style={{ width: 130, height: 130, marginTop: 12 }}
            src='https://upload.wikimedia.org/wikipedia/vi/thumb/b/bf/Logo_HUET.svg/1024px-Logo_HUET.svg.png'
          />
        </PDF.View>
        <PDF.Text style={{ textAlign: 'center', marginTop: 12, fontSize: 24 }}>Certificate of Completion</PDF.Text>
        <PDF.Text style={{ textAlign: 'center', fontSize: 32, margin: '12px 0' }}>Lý Đức Chính</PDF.Text>
        <PDF.Text style={{ textAlign: 'center' }}>Đã hoàn thành thực tập tài phòng thí nghiệm ABC với dự án</PDF.Text>
        <PDF.Text style={{ textAlign: 'center', fontSize: 28 }}>"DEF"</PDF.Text>
        <PDF.Text>Kết quả: Cút</PDF.Text>
        <PDF.Text>Nhận xét của GVHD: Ngu</PDF.Text>
      </PDF.View>
    </PDF.Page>
  </PDF.Document>
)

function Certificate() {
  return (
    <div>
      <PDF.PDFViewer children={<MyDoc />} width='100%' height='800px'></PDF.PDFViewer>
    </div>
  )
}

const styles = PDF.StyleSheet.create({
  page: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fefbef'
  },
  certificateView: { width: '100%', border: '4px solid #C87D3C', padding: '12px', height: '100%' }
})

export default Certificate
