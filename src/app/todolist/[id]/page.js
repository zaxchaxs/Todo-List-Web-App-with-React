import DetailModal from '@/components/DetailModal';

export default function Page({ params }) {
    
    console.log(params);
    return (
        <DetailModal params={params.id} />
    )
  }