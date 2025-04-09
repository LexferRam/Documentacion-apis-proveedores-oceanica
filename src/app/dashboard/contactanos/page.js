'use client'
import React, { useEffect, useState } from 'react';
import { 
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  styled,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  useMediaQuery
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import { green } from '@mui/material/colors';
import Axios from "axios";

const DeveloperCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#ffffff',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
    borderRadius: 12,
  }
}));

const CompactListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[2],
    borderRadius: 12
  },
  '& + &': {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '&:hover': {
      transform: 'translateY(-2px)',
    }
  }
}));


function useSessionStorage(key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = sessionStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    }
  }, [key]);

  return value;
}

const ContactanosDevTeam = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const emailContacto = 'notificacionesoceanicaseguros@gmail.com';
  const profile = useSessionStorage("PROFILE_KEY");
  const CodigoAsesor = profile?.p_insurance_broker_code;
  const [desarrollador, setDesarrollador] = useState(null);


  const constConsultaDesarrollador = async () => {
    try {
      const param = {
        p_codinter: CodigoAsesor
      }
      const response = await Axios.post(
        "https://oceanicadeseguros.com/asg-api/dbo/doc_api/sp_consulta_desarrollador_sol",param
      );
      setDesarrollador(response.data.c_det_api);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  useEffect(() => {
    if (CodigoAsesor !== undefined) {
      constConsultaDesarrollador();   
    }
  }, [CodigoAsesor]);


  const devTeam = [
    {
      "NOMBRE": "Lexfer Ramirez",
      "WHATSAPP": "https://w.app/lexferramirez",
      "ROL": "Desarrollador"
    }
    // Agrega más miembros del equipo aquí si es necesario
  ];

  const handleContact = (value) => {
    window.open(value, '_blank');
  };

  return (
    <Box sx={{ 
      padding: isMobile ? theme.spacing(1.5) : theme.spacing(3), 
      backgroundColor: '#ffffff',
      minHeight: '100vh'
    }}>
      <DeveloperCard>
        <CardContent sx={{ 
          padding: isMobile ? theme.spacing(2) : theme.spacing(4),
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Box textAlign="center" mb={isMobile ? 1.5 : 3} sx={{ width: '100%' }}>
            <GroupsIcon sx={{ 
              fontSize: isMobile ? 36 : 48, 
              color: theme.palette.primary.main,
              mb: 1,
              backgroundColor: theme.palette.grey[100],
              borderRadius: '50%',
              padding: isMobile ? theme.spacing(1) : theme.spacing(1.5),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }} />
            <Typography 
              variant={isMobile ? 'h6' : 'h5'}
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.dark,
                letterSpacing: 0.5,
                fontSize: isSmallMobile ? '1.25rem' : null
              }}
            >
              Contacta a Nuestro Equipo
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 600, 
                margin: 'auto',
                mb: isMobile ? 1 : 2,
                lineHeight: 1.5,
                fontSize: isMobile ? '0.875rem' : '1rem',
                wordBreak: 'break-word'
              }}
            >
              Nuestros especialistas están listos para ayudarte. <br />
              También puedes escribirnos a: <strong>{emailContacto}</strong>
              <EmailIcon 
                fontSize="small" 
                sx={{ 
                  ml: 0.5,
                  verticalAlign: 'middle',
                  color: theme.palette.text.secondary
                }} 
              />
            </Typography>
          </Box>

          <Box sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <List disablePadding sx={{ 
              width: isMobile ? '100%' : '80%',
              maxWidth: 600
            }}>
              {desarrollador?.map((dev, index) => (
                <CompactListItem 
                  key={index}
                  secondaryAction={
                    <IconButton 
                      size={isMobile ? 'medium' : 'large'}
                      onClick={() => handleContact(dev.WHATSAPP)}
                      sx={{ 
                        color: '#fff',
                        backgroundColor: green[500],
                        '&:hover': {
                          backgroundColor: green[600],
                          transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 10px rgba(37, 211, 102, 0.2)',
                        width: isSmallMobile ? 44 : 48,
                        height: isSmallMobile ? 44 : 48
                      }}
                    >
                      <WhatsAppIcon fontSize={isMobile ? 'large' : 'large'} />
                    </IconButton>
                  }
                >
                  <ListItemAvatar sx={{ minWidth: isMobile ? 40 : 48 }}>
                    <Avatar 
                      sx={{ 
                        width: isMobile ? 32 : 40, 
                        height: isMobile ? 32 : 40,
                        bgcolor: theme.palette.primary.main,
                        color: '#fff',
                        fontSize: isMobile ? '0.875rem' : '1rem',
                        fontWeight: 600
                      }}
                    >
                      {dev.NOMBRE.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        sx={{ 
                          fontSize: isMobile ? '0.9375rem' : '1.0625rem',
                          lineHeight: 1.2
                        }}
                      >
                        {dev.NOMBRE}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mt: 0.5, 
                          fontSize: isMobile ? '0.75rem' : '0.8125rem',
                          lineHeight: 1.2
                        }}
                      >
                        {'Desarrollador'}
                      </Typography>
                    }
                    sx={{ my: 0 }}
                  />
                </CompactListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ 
            my: isMobile ? 1.5 : 3, 
            borderColor: theme.palette.divider,
            borderBottomWidth: 1,
            opacity: 0.5,
            width: isMobile ? '100%' : '80%'
          }} />

          <Box textAlign="center" sx={{ mt: 1, width: '100%' }}>
            <Typography 
              variant="caption" 
              display="block" 
              color="text.secondary"
              sx={{ 
                fontSize: isMobile ? '0.6875rem' : '0.8125rem',
                letterSpacing: 0.3
              }}
            >
              Respuesta promedio: <strong>2-4 horas</strong> • Horario: <strong>8AM-5PM</strong>
            </Typography>
          </Box>
        </CardContent>
      </DeveloperCard>
    </Box>
  );
};

export default ContactanosDevTeam;