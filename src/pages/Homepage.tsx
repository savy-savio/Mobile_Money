import AboutUs from "./Aboutus"
import BusinessBanking from "./Businessbanking"
import CardsSection from "./Cardsection"
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
    </div>
  )
}

export default Homepage