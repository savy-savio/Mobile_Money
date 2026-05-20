import BusinessBanking from "./Businessbanking"
import CardsSection from "./Cardsection"
import Hero from "./Hero"
import PersonalBanking from "./Personalbanking"


const Homepage = () => {
  return (
    <div>
      <Hero />
      <PersonalBanking />
      <BusinessBanking />
      <CardsSection />
    </div>
  )
}

export default Homepage