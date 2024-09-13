import {
  Banner,
  Button,
  Heading,
  BlockSpacer,
  ProductThumbnail,
  Icon,
  InlineLayout,
  Page,
  InlineStack,
  TextField,
  Grid,
  View,
  reactExtension,
  Checkbox,
  Text,
  InlineSpacer,
  Choice,
  ChoiceList,
  BlockStack,
  Card,
  useApi,
  useOrder,
  Pressable,
  useStorage,
  useShop
} from '@shopify/ui-extensions-react/customer-account'
import { useEffect, useState } from 'react'

export default reactExtension('customer-account.page.render', () => (
  <FullPageExtension />
))

function FullPageExtension() {
  const { navigation, extension, i18n } = useApi()
  const [currentStep, setCurrentStep] = useState(1)

console.log("navigation", navigation?.currentEntry?.url?.replace("'extension:/shopify/Order/", ""))

  const [checkedProducts, setCheckedProducts] = useState([])
  const [shippingIssue, setShippingIssue] = useState('')
  const [issueDetails, setIssueDetails] = useState({
    issue: '',
    links: []
  })
  const [receiveOption, setReceiveOption] = useState('')


  return (
    <>
      <Page
        title='Resolve Shipping Problems'
        subtitle='Was your package lost, damaged or stolen while being shipped? Then let"s get it taken care of'
        secondaryAction={
          <Button
            accessibilityLabel='Button'
            onPress={() =>
              navigation.navigate(`shopify:customer-account/orders/${orderId}`)
            }
          />
        }>
        {/* Product Seletion Step  */}
        {currentStep == 1 && (
          <>
            <Card padding>
              <Text size='large'>Select faulty products</Text>
              <BlockSpacer spacing='loose' />

              {[1, 2, 3].map((item, index) => (
                <View key={index}>
                  <Grid
                    blockAlignment='center'
                    columns={['auto', 'auto', 'fill', 'auto']}
                    spacing='loose'>
                    <Checkbox
                      checked={checkedProducts.includes(index)}
                      onChange={() => {
                        if (checkedProducts.includes(index)) {
                          setCheckedProducts(
                            checkedProducts.filter((i) => i !== index)
                          )
                        } else {
                          setCheckedProducts([...checkedProducts, index])
                        }
                      }}
                    />

                    <ProductThumbnail
                      size='base'
                      source='https://shopify.dev/assets/templated-apis-screenshots/checkout-ui-extensions/unstable/productthumbnail-default.png'
                    />
                    <View>
                      <BlockStack spacing='small500'>
                        <Text size='base'>
                          Beard Gains - Valhalla Vikings Beard Cutting
                        </Text>
                        <Text size='extraSmall' appearance='accent'>
                          Variant: 90ml/3oz
                        </Text>
                      </BlockStack>
                    </View>
                    <View>
                      <Text size='base'>$62.38</Text>
                    </View>
                  </Grid>
                  <BlockSpacer spacing='base' />
                </View>
              ))}
            </Card>
            <Button
              onPress={() => {
                setCurrentStep(2)
              }}>
              Next
            </Button>
          </>
        )}

        {/* Issue Selection Step  */}
        {currentStep == 2 && (
          <>
            <Card padding>
              <Text size='large'>Select an issue</Text>
              <BlockSpacer spacing='loose' />

              <ChoiceList
                name='group-single'
                variant='group'
                value={shippingIssue}
                onChange={(value) => {
                  setShippingIssue(value)
                }}>
                {['Damaged', 'Lost', 'Stolen'].map((item, index) => (
                  <View key={index}>
                    <Choice
                      secondaryContent={<Icon source='arrowRight' />}
                      id={item.toLowerCase()}>
                      {item}
                    </Choice>

                    <BlockSpacer spacing='small200' />
                  </View>
                ))}
              </ChoiceList>
            </Card>
            <InlineLayout columns={['35%', 'fill']} spacing='base'>
              <Button
                kind='secondary'
                onPress={() => {
                  setCurrentStep(1)
                  setShippingIssue('')
                }}>
                Back
              </Button>
              <Button
                kind='primary'
                onPress={() => {
                  setCurrentStep(3)
                }}>
                Next
              </Button>
            </InlineLayout>
          </>
        )}

        {/* Explain Issue Step  */}
        {currentStep == 3 && (
          <>
            <Card padding>
              <Text size='medium'>Explain your issue *</Text>
              <BlockSpacer spacing='small300' />

              <TextField
                required
                multiline='10'
                onChange={(value) =>
                  setIssueDetails({
                    ...issueDetails,
                    issue: value
                  })
                }
              />
              <BlockSpacer spacing='loose' />

              <Text size='medium'>Add image links (separated by comma)</Text>
              <BlockSpacer spacing='small300' />

              <TextField
                required
                multiline='10'
                onChange={(value) => {
                  const linksArray = value
                    .split(',')
                    .map((link) => link.trim())
                    .filter((link) => link !== '')

                  setIssueDetails({
                    ...issueDetails,
                    links: linksArray
                  })
                }}
              />
            </Card>
            <InlineLayout columns={['35%', 'fill']} spacing='base'>
              <Button
                kind='secondary'
                onPress={() => {
                  setCurrentStep(2)
                }}>
                Back
              </Button>
              <Button
                kind='primary'
                onPress={() => {
                  if (issueDetails.issue) {
                    setCurrentStep(4)
                  }
                }}>
                Next
              </Button>
            </InlineLayout>
          </>
        )}

        {/* Receive Option Selection  */}
        {currentStep == 4 && (
          <>
            <Card padding>
              <Text size='large'>What would you like to receive?</Text>
              <BlockSpacer spacing='loose' />

              <ChoiceList
                name='group-single'
                variant='group'
                value={receiveOption}
                onChange={(value) => {
                  setReceiveOption(value)
                }}>
                {['Refund', 'Reorder'].map((item, index) => (
                  <View key={index}>
                    <Choice
                      secondaryContent={<Icon source='arrowRight' />}
                      id={item.toLowerCase()}>
                      {item}
                    </Choice>

                    <BlockSpacer spacing='small200' />
                  </View>
                ))}
              </ChoiceList>
            </Card>
            <InlineLayout columns={['35%', 'fill']} spacing='base'>
              <Button
                kind='secondary'
                onPress={() => {
                  setCurrentStep(3)
                  setReceiveOption('')
                }}>
                Back
              </Button>
              <Button
                kind='primary'
                onPress={() => {
                  setCurrentStep(4)
                }}>
                Next
              </Button>
            </InlineLayout>
          </>
        )}
      </Page>
    </>
  )
}
