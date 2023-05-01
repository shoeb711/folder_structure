import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  colorPrimary: '#0060df',
  colorSecondary: '#fbfbfe',
  colorAccent: '#fd6f53',
  fontColor: '#000000',
};

const darkTheme = {
  colorPrimary: '#17ed90',
  colorSecondary: '#2a2c2d',
  colorAccent: '#12cdea',
  fontColor: '#ffffff',
};

const Container = styled.div<{ theme: any }>`
  display: flex;
  width: 100%;
  height: 65px;
  background: ${({ theme }) => theme.colorSecondary};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.fontColor};
    font-family: sans-serif;
  }
`;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked }) => (checked ? '#2196f3' : '#ccc')};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 40px;
    width: 40px;
    left: ${({ checked }) => (checked ? '24px' : '0')};
    bottom: 4px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    box-shadow: 0 0px 15px #2020203d;
    background: white
      url(${({ checked }) => checked? 'https://i.ibb.co/7JfqXxB/sunny.png': 'https://i.ibb.co/FxzBYR9/night.png'});
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
  }
`;

interface IProps {
  handleThemeToggle: (theme: boolean) => void;
}

const ThemeSwitcher = (props: IProps) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'theme-dark'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.className = 'theme-dark';
      localStorage.setItem('theme', 'theme-dark');
    } else {
      document.documentElement.className = 'theme-light';
      localStorage.setItem('theme', 'theme-light');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    props.handleThemeToggle(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Container>
        <SwitchContainer>
          <SwitchInput
            type='checkbox'
            checked={isDarkMode}
            onChange={handleThemeToggle}
          />
          <Slider checked={isDarkMode} />
        </SwitchContainer>
      </Container>
    </ThemeProvider>
  );
};

export default ThemeSwitcher;
