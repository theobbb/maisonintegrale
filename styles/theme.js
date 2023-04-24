import MuiTypoWrapper from "@/components/muiTypoWrapper";
import { createTheme } from "@mui/material";

const layout = {

    x: {xl: 9, lg: 6, md: 4, sm: 3, xs: 2},
    x2: {xl: 18, lg: 12, md: 8, sm: 6, xs: 4},
    y: {xl: 10, lg: 8, md: 8, sm: 8, xs: 6},

    divider: {xl: 10, lg: 10, md: 10, sm: 10, xs: 10},

}



const palette = {

    light: {
        primary: {
            main: 'rgba(0, 0, 0, 1)', 
            greenTitle: 'rgba(36, 83, 37, 0.64)',
        },
        background: {
            default: 'rgba(240, 240, 240, 1)',
        },
    },
    dark: {
        primary: {
            main: 'rgba(255, 255, 255, 1)',
            divider: 'rgba(0, 0, 0, 0.8)',
            greenTitle: 'rgba(36, 83, 37, 0.74)',
        },
        background: {
            default: '#1D1D1D',
        },
    }
}

const typography = {

    
    fontFamily: [
        'Manrope',
        //'Ubuntu Mono',
        //'PT Mono',
        'sans-serif'
    ].join(','),

    h7: {
      fontSize: '1.0rem',
    },


    mini: {
      fontWeight: 500,
        color: 'rgba(35, 128, 38, 0.83)',
    },


/*
    p: {
      fontSize: '1.2rem',
      color: 'rgba(0, 0, 0, 0.88)',
    },*/
    body0: {
      fontSize: '20px',
    },
    body1: {
      fontSize: '18px',
    },
    body2: {
      fontSize: '16px',
    },

    bold: {
      fontSize: '1rem',
      fontWeight: 500,
      opacity: 0.98,
    },

    button: {
      fontWeight: 500,
      fontSize: '0.86rem',
    }
}


const components = {

  MuiTypography: {
    defaultProps: {
      //component: MuiTypoWrapper,
    }
  },

  MuiButtonBase: {
    variants: [
      {
        props: { variant: 'link' },
        style: {
          padding: '0px 12px',
          borderRadius: '24px',
          fontFamily: 'Manrope',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }
        }
      }
    ],
    

  },


    MuiButton: {
        variants: [
            {
              props: { variant: 'contact' },
              style: {
                background: '#C8E5C9',
                border: '1px solid rgba(31, 133, 35, 0.6)',
                
                borderRadius: '24px',
                '&:hover': {
                  background: 'rgba(165, 206, 167, 1)'
                }
                //display: 'none  !important', 
              },
            },
            {
                props: { variant: 'fake' },
                style: {
                  minWidth: 'unset',
                    position: 'absolute',
                    width: '100%', 
                    height: '100%',
                    borderRadius: '24px',
                    height: '100%',
                    top: 0,
                    right: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    background: '#C8E5C9',
                    zIndex: -1,
                    border: '2px solid rgba(31, 133, 35, 0.31)',
                    '&:hover': {
                      background: 'none'
                    }
                },
            }
        ]
    },

    MuiIconButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            //background: '#C8E5C9',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            
          },
        },
      ],
      styleOverrides: {
        root: {
            
            border: 'none',
            
        }
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        root: {
            
            //border: '1px solid rgba(0, 0, 0, 0.2)',
            '& img': {
              borderRadius: '12px',
            }
        }
      },
    },

    MuiDivider: {
        styleOverrides: {
            root: {
                zIndex: 10000,
                position: 'relative',
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.8)',
            }
        },
    },

}


const themeProperties = {
    typography,
    palette,
    components,
    layout,

  }

export const theme = createTheme(themeProperties);