import generateHTML from '@/utils/generateHTML';

export default async function Home() {

  const {
    contentHtml
  } = await generateHTML('api//doc');

  return <div
    className='p-3 pt-5 md:pt-10 font-mono prose-h1:m-0 prose-h2:mt-[1em] w-full max-w-4xl mx-auto prose prose-slate'
  >
    <div
      className='prose prose-slate'
      dangerouslySetInnerHTML={{
        __html: contentHtml
      }}
    />
  </div>
}