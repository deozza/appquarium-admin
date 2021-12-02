import { mount } from "@vue/test-utils";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";

describe('Testing BaseParagraph.vue component', () => {

  test('standard', () => {
    const paragraph: BaseParagraphModel = new BaseParagraphModel('content')
    const component = mount(BaseParagraph, {
      propsData: {
        baseParagraphModel: paragraph
      }
    })

    expect(component.find('p').text()).toBe('content')
    expect(component.find('p').classes()).toEqual(['light'])
  })

  test('customize style', () => {
    const paragraph: BaseParagraphModel = new BaseParagraphModel('content')
    paragraph.setStyleOrThrowError('danger')
    const component = mount(BaseParagraph, {
      propsData: {
        baseParagraphModel: paragraph
      }
    })

    expect(component.find('p').classes()).toEqual(['danger'])
  })
})
