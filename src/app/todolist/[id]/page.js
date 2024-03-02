import DetailPage from '@/components/DetailPage';

export default function Page({ params }) {
    
    return (
        <DetailPage params={params.id} />
    )
  }