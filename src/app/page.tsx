export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 font-sans">
      <main className="mx-auto flex w-full max-w-md flex-col gap-5 px-4">
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Course Information
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Personal Data
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Payment Method
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          Resume
        </section>
        <section className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md">
          CTA
        </section>
      </main>
    </div>
  );
}
