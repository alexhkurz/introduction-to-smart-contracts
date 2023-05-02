import SectionContainer from '~/components/SectionContainer.tsx';

export default function LayoutWrapper({ children }) {
  return (
    <SectionContainer>
      <header className="flex items-center justify-between md:py-6 lg:py-10">
        <div className="mx-auto text-5xl">Introduction to Smart Contracts</div>
      </header>
      <main>{children}</main>
    </SectionContainer>
  );
}
