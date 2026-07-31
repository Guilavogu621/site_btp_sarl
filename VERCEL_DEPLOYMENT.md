# Guide de Déploiement Gratuit sur Vercel (Coût : 0 $ / mois)

Votre application web **Best Builders SARLU** sous Next.js est prête pour la mise en ligne avec un hébergement **100% gratuit** (disponible 24h/24, 7j/7, sans aucune mise en veille).

---

## 🚀 Étape 1 : Publier le projet sur GitHub

1. Créez un compte gratuit sur [GitHub.com](https://github.com/) si vous n'en avez pas déjà un.
2. Créez un nouveau dépôt (Repository) nommé `best-builders-next`.
3. Poussez le dossier `next-app` sur GitHub :
   ```bash
   cd next-app
   git init
   git add .
   git commit -m "Initial commit Next.js Best Builders"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/best-builders-next.git
   git push -u origin main
   ```

---

## ⚡ Étape 2 : Connecter à Vercel (Gratuit à vie)

1. Rendez-vous sur [Vercel.com](https://vercel.com/) et connectez-vous avec votre compte **GitHub**.
2. Cliquez sur **"Add New..."** → **"Project"**.
3. Sélectionnez le dépôt `best-builders-next`.
4. Vercel détecte automatiquement Next.js. Laissez toutes les options par défaut et cliquez sur **"Deploy"**.

⏱️ **En moins de 60 secondes, votre site sera en ligne avec une adresse HTTPS gratuite (ex: `best-builders.vercel.app`).**

---

## 🌐 Étape 3 : Ajouter votre Nom de Domaine Personnalisé (Optionnel)

Si vous achetez un nom de domaine (ex: `bestbuilders.com` ou `bestbuilders.gn`) auprès d'un registrar (Namecheap, LWS, Hostinger) :
1. Dans Vercel, allez dans **Settings** → **Domains**.
2. Saisissez votre nom de domaine.
3. Vercel vous donnera 2 enregistrements DNS (CNAME/A) à copier-coller chez votre fournisseur de nom de domaine.

---

### 🎉 Vos avantages avec Next.js + Vercel
- **Coût d'hébergement :** 0 $ / mois (100% gratuit)
- **Disponibilité :** 100% en ligne 24h/24, 7j/7
- **Vitesse :** Chargement instantané sur ordinateurs et mobiles partout dans le monde
- **Mises à jour :** Dès que vous modifiez le code et le poussez sur GitHub, Vercel met à jour le site automatiquement en 30 secondes !
