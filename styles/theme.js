import MuiTypoWrapper from "@/components/muiTypoWrapper";
import { createTheme } from "@mui/material";
import { green } from '@mui/material/colors';

const layout = {

    x: {xl: 10, lg: 6, md: 4, sm: 3, xs: 2},
    x2: {xl: 18, lg: 12, md: 8, sm: 6, xs: 4},
    y: {xl: 10, lg: 8, md: 8, sm: 8, xs: 6},
 
    divider: {xl: 10, lg: 10, md: 10, sm: 10, xs: 10},

}



const palette = {

    light: {
        green: {
          outline: 'rgba(73, 138, 46, 0.3)',
          //outline: 'rgba(31, 133, 35, 0.3)' ,
          background: 'rgba(73, 138, 46, 0.1)' ,
        },
        primary: {
            main: 'rgba(0, 0, 0, 1)', 
        },
        background: {
            default: 'rgb(241, 242, 224)',
        },
        action: {
          background: 'rgba(0, 0, 0, 0.04)',
          hover: {
            opacity: 'rgba(0, 0, 0, 0.5)',
          }
        },
        contrastAction: {
          text: 'rgba(0, 0, 0, 0.92)',
          background: 'rgba(73, 138, 46, 0.3)',
          hover: 'rgba(73, 138, 46, 0.4)',
          border: 'rgba(73, 138, 46, 0.4)',
        },
        border: 'rgba(0, 0, 0, 0.25)',
    },
    dark: {
        green: {
          outline: 'rgba(73, 138, 46, 0.3)',
          background: 'rgba(73, 138, 46, 0.07)',
        },
        text: {
          primary: 'rgba(255, 255, 255, 0.88)',
        },
        primary: {
            main: 'rgba(255, 255, 255, 1)',
            divider: 'rgba(0, 0, 0, 0.8)',

        },
        
        secondary: {
          main: 'rgba(255, 255, 255, 1)',
        },
        
        background: {
            default: 'rgb(27, 28, 24)',
        },
        action: {
          
          hover: {
            opacity: 'rgba(255, 255, 255, 0.08)',
          }
        },
        contrastAction: {
          text: 'rgba(255, 255, 255, 0.92)',
          background: 'rgba(73, 138, 46, 0.2)',
          hover: 'rgba(73, 138, 46, 0.3)',
          border: 'rgba(255, 255, 255, 0.15)',
        },
        border: 'rgba(255, 255, 255, 0.25)',
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
      fontSize: '1.05rem',
    },


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

const sx = {
  selected: {
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
    //background: '#C8E5C9',
    zIndex: -1,
    border: '2px solid rgba(31, 133, 35, 0.31)',
    '&:hover': {
      //background: 'none'
    }
  }
}


const components = (mode) => ({


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
            //backgroundColor: 'rgba(0, 0, 0, 0.05)',
          }
        }
      }
    ],
    

  },


    MuiButton: {
        variants: [
          {
            props: { variant: 'link' },
            style: {
              padding: '0 12px',
              borderRadius: '24px',
              fontFamily: 'Manrope',
              '&:hover': {
                //backgroundColor: 'rgba(0, 0, 0, 0.05)',
              }
            }
          },
            {
              props: { variant: 'contrast' },
              style: {
                background: palette[mode].contrastAction.background,
                color: palette[mode].contrastAction.text,
                border: palette[mode].contrastAction.border,
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '24px',
                padding: '0px 12px',
                '&:hover': {
                  background: palette[mode].contrastAction.hover,
                }

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
                    //background: '#C8E5C9',
                    zIndex: -1,
                    border: '2px solid rgba(31, 133, 35, 0.31)',
                    '&:hover': {
                      //background: 'none'
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
            border: `1px solid ${palette[mode].border}`,
            
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

})


export const themeProperties = (mode) => ({
    typography,
    palette,
    components: components(mode),
    layout,
    sx,

})

export const theme = createTheme(themeProperties);