import { TextImgSplit } from '../components/textImgSplit/TextImgSplit'
import { HomePageTop } from '../components/homePageTop/HomePageTop'
import { Spacer } from '../components/spacer/Spacer'
import ShoppingSVG from '../shared/images/undraw_web_shopping_dd4l.svg'
import RelaxedSVG from '../shared/images/undraw_a_moment_to_relax_bbpa.svg'

export const Home = () => {

  const textBlock1: string = 'Spicy jalapeno bacon ipsum dolor amet venison id frankfurter, cupim ipsum turducken laborum in pancetta in biltong. Dolor doner drumstick, turducken incididunt venison chicken bacon laboris kielbasa ground round ea. Ullamco leberkas chislic beef ribs pancetta pastrami. Ham capicola biltong, laboris drumstick kielbasa ut sausage beef prosciutto ham hock esse kevin. Corned beef ham hock cillum beef, bacon brisket beef ribs capicola aliqua aliquip commodo jowl mollit incididunt.'

  const textBlock2: string = 'Spicy jalapeno bacon ipsum dolor amet excepteur venison duis non laborum est doner sausage in fugiat pork chop tempor. Cupim ut tongue veniam. Cow bresaola nisi id proident pancetta alcatra exercitation. Strip steak t-bone dolore porchetta, meatloaf ham sunt ea eu swine. Anim t-bone fatback in minim. In incididunt burgdoggen, pork loin proident filet mignon pancetta pork belly salami bresaola fatback. Buffalo aliquip pastrami cupim, cupidatat drumstick kevin.'
  const title2: string = 'YEEEEEEE YEEEE'
  
  return (
    <div className='homePage'>
      <HomePageTop />
      <TextImgSplit img={ShoppingSVG} text={textBlock1} />
      <Spacer />
      <TextImgSplit img={RelaxedSVG} text={textBlock2} title={title2} reverse />
    </div>
  )
}
