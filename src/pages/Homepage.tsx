import AboutUs from "./Aboutus"
import BusinessBanking from "./Businessbanking"
import CardsSection from "./Cardsection"
import ContactSection from "./Contactsection"
import Hero from "./Hero"
import Investments from "./Investments"
import PersonalBanking from "./Personalbanking"


const Homepage = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <PersonalBanking />
      <BusinessBanking />
      <Investments />
      <CardsSection />
      <ContactSection />
    </div>
  )
}

export default Homepage