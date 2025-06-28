"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Создаем кастомную тему для глобального шрифта
const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#D7AC8A", // Цвет фона при наведении
            color: "white", // Цвет текста при наведении (опционально)
          },
        },
      },
    },
  },
});

export default function SelectVariants() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{
              color: "gray",
              "&.Mui-focused": {
                color: "black",
              },
            }}
          >
            Выбрать подкатегорию
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={age}
            onChange={handleChange}
            label="Age"
            sx={{
              fontFamily: "Montserrat",
              "&:after": {
                borderColor: "#D7AC8A",
              },
              "& .MuiSelect-select": {
                fontFamily: "Montserrat",
                backgroundColor: "inherit", // Фон выбранного значения
                "&:focus": {
                  backgroundColor: "inherit", // Чтобы фон не менялся при фокусе
                },
              },
            }}
          >
            <MenuItem
              value={10}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#D7AC8A",
                },
              }}
            >
              qwe
            </MenuItem>
            <MenuItem
              value={10}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#D7AC8A",
                },
              }}
            >
              qwe
            </MenuItem>
            <MenuItem
              value={10}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "transparent",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#D7AC8A",
                },
              }}
            >
              qwe
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
