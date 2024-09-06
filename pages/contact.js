import Layout from "@/components/layout";
import {
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { LangContext } from "@/utils/context";
import { useRouter } from "next/router";
import ContactButton from "@/components/contactButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Head from "next/head";

export default function Contact() {
  const { locale } = useRouter();

  const theme = useTheme();

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const matchDownXL = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  const data = {
    fr: {
      contact: "CONTACTEZ",
      name: "nom",
      phone: "téléphone",
      send: "envoyer un message",
    },
    en: {
      contact: "CONTACT",
      name: "name",
      phone: "phone",
      send: "send message",
    },
  };

  const background =
    theme.palette.mode == "light" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.1)";

  return (
    <>
      <Head>
        <title>{meta.title[locale]}</title>
        <meta name="description" content={meta.description[locale]} />
      </Head>

      <div className="m-auto px-4 max-w-[536px] py-24">
        <div className=" border-2 border-white/10 rounded-lg px-5 py-4 flex flex-col">
          <div className="text-2xl mb-8">
            {data[locale].contact} MAISON INTÉGRALE
          </div>
          <div className=" gap-2 flex flex-col">
            <div className="flex opacity-70 items-center">
              <PersonIcon sx={{ marginRight: 1, fontSize: "inherit" }} />
              Marc Baillargeon
            </div>
            <div className="flex opacity-70 items-center">
              <PhoneIcon sx={{ marginRight: 1, fontSize: "inherit" }} />
              450 602 4535
            </div>
            <div className="flex opacity-70 mt-4 items-center">
              <LocationOnIcon sx={{ marginRight: 1, fontSize: "inherit" }} />
              Laurentides
            </div>
            <div className="self-end">
              <Button
                variant="contrast"
                color="secondary"
                onClick={() => {
                  window.open("mailto:baillargeonmarc@gmail.com");
                }}
              >
                <Typography variant="h6">{data[locale].send}</Typography>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 0.5,
                    marginRight: -0.8,
                  }}
                >
                  <ArrowOutwardIcon sx={{ fontSize: "inherit" }} />
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const data = null;
  return { props: { data: data } };
}
const meta = {
  title: {
    fr: "Contact | Maison Intégrale",
    en: "Contact | Maison Intégrale",
  },
  description: {
    fr: "Formulaire de contact. Maison Intégrale, Construction de maisons écoénergétiques. Marc Baillargeon, 450 602 4535, Laurentides, Québec.",
    en: "Contact form. Maison Intégrale, Construction of energy-efficient homes. Marc Baillargeon, 450 602 4535, Laurentides, Quebec.",
  },
};
