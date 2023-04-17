import generateHTML from '@/utils/generateHTML';

export default async function Home() {

  const {
    contentHtml
  } = await generateHTML('api//doc');

  return <div
    className='px-3 py-5 md:py-10 w-full max-w-3xl mx-auto prose prose-slate'
  >
    <div
      className='prose prose-slate'
      dangerouslySetInnerHTML={{
        __html: contentHtml
      }}
    />
  </div>
}