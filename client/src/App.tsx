import { MantineProvider } from '@mantine/core';

import Routes from '@/Routes';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes />;
    </MantineProvider>
  );
};

export default App;
