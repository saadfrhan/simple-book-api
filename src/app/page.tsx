import generateHTML from '@/utils/generateHTML';

export default async function Home() {

  const {
    contentHtml
  } = await generateHTML('api//doc');

  return <div
    className='flex justify-center items-center font-mono flex-col mx-auto py-14 w-[500px]'
  >
    <div
      className='prose prose-slate'
      dangerouslySetInnerHTML={{
        __html: contentHtml
      }}
    />
  </div>
}