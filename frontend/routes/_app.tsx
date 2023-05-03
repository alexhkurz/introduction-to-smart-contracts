import LayoutWrapper from '~/components/LayoutWrapper.tsx';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  );
}
