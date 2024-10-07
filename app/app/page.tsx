import { Zap, Globe, Users, Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-orange-500">
        <a className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-white" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium text-white hover:underline underline-offset-4" href="/login">
            Connexion
          </a>
          <a className="text-sm font-medium text-white hover:underline underline-offset-4" href="/register">
            Création de compte
          </a>
          <a className="text-sm font-medium text-white hover:underline underline-offset-4" href="#">
            Communauté
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Expérience en Temps Réel Inégalée
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Découvrez la puissance de notre application temps réel. Connectez-vous, collaborez et créez comme jamais auparavant.
                </p>
              </div>
              <div>
                <button className="inline-flex h-9 items-center justify-center rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:pointer-events-none disabled:opacity-50">
                  Commencer
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Fonctionnalités Principales</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="bg-white shadow-md rounded-lg p-6">
                <Globe className="h-8 w-8 mb-2 text-orange-500" />
                <h3 className="text-xl font-semibold">Collaboration Mondiale</h3>
                <p>Connectez-vous avec des utilisateurs du monde entier en temps réel.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <Zap className="h-8 w-8 mb-2 text-orange-500" />
                <h3 className="text-xl font-semibold">Mises à jour Instantanées</h3>
                <p>Voyez les changements se produire instantanément sur tous les appareils.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <Users className="h-8 w-8 mb-2 text-orange-500" />
                <h3 className="text-xl font-semibold">Travail d'équipe Fluide</h3>
                <p>Collaborez sans effort avec vos coéquipiers sur des projets en direct.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Ce que disent nos utilisateurs</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold">Marie D.</h3>
                <p className="text-gray-500">Designer UX</p>
                <p className="mt-2">"Cette application a révolutionné notre façon de travailler en équipe. C'est incroyablement rapide et intuitif !"</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current text-orange-500" />
                  ))}
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold">Thomas L.</h3>
                <p className="text-gray-500">Développeur Full-Stack</p>
                <p className="mt-2">"La synchronisation en temps réel est bluffante. Nos projets avancent beaucoup plus vite maintenant."</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current text-orange-500" />
                  ))}
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-xl font-semibold">Sophie M.</h3>
                <p className="text-gray-500">Chef de Projet</p>
                <p className="mt-2">"Gérer des équipes à distance n'a jamais été aussi simple. Un outil indispensable pour notre entreprise."</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current text-orange-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Conditions d'utilisation
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Politique de confidentialité
          </a>
        </nav>
      </footer>
    </div>
  );
}
