<template>
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
    <Button 
      size="lg" 
      class="rounded-full shadow-lg flex gap-2"
      @click="openPaymentModal"
    >
      <div class="flex items-center gap-2">
        <ShoppingBag />
        <span>{{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }}</span>
        <span>|</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
    </Button>
    
    <Teleport to="body">
      <div 
        v-if="showPaymentModal" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click.self="showPaymentModal = false"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Pagamento</h2>
            <Button variant="ghost" size="icon" @click="showPaymentModal = false">
              <X class="h-5 w-5" />
            </Button>
          </div>
          
          <div class="mb-4">
            <h3 class="font-semibold mb-2">Resumo do pedido</h3>
            <div class="max-h-40 overflow-y-auto">
              <div 
                v-for="item in items" 
                :key="item.id" 
                class="flex justify-between py-2 border-b"
              >
                <div>
                  <span>{{ item.name }}</span>
                  <span class="text-sm text-gray-500 ml-2">x{{ item.quantity }}</span>
                </div>
                <span>{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>
            <div class="font-bold text-lg mt-4 flex justify-between">
              <span>Total:</span>
              <span>{{ formatPrice(totalPrice) }}</span>
            </div>
          </div>

          <div v-if="!paymentMethod" class="flex flex-col gap-3 mt-4">
            <Button class="bg-white text-black flex items-center justify-center gap-2 p-3"
              @click="setPaymentMethod('pix')">
              <span class="text-[14px]">Pagar com Pix</span>
              <img :src="PixIcon" class="w-6" />
            </Button>
            <Button disabled
              class="bg-white text-black flex items-center justify-center gap-2 p-3"
              @click="setPaymentMethod('bitcoin')">
              <span class="text-[14px]">Pagar com Bitcoin</span>
              <img :src="BitcoinIcon" class="w-6" />
            </Button>
          </div>
          
          <div v-if="paymentMethod === 'pix'" class="space-y-4">
            <div v-if="pixCopiaCola" class="flex flex-col items-center">
              <img :src="pixQrCode" class="h-24"/>
              <div class="mt-4 w-full">
                <p class="text-sm text-gray-500 mb-1">Código PIX para copiar:</p>
                <div class="relative">
                  <input 
                    ref="pixInputRef"
                    type="text" 
                    class="w-full p-2 pr-8 border rounded bg-gray-50 text-sm" 
                    readonly 
                    :value="pixCopiaCola" 
                  />
                    
                  <CopyIcon class="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4" @click="copyPixCode"/>
                </div>
                <p v-if="copied" class="text-xs text-green-600 mt-1">Código copiado!</p>
              </div>
            </div>
          </div>
          <div v-else>

          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { ShoppingBag, X, Copy as CopyIcon } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'
import { QrCodePix } from 'qrcode-pix'
import { formatPrice } from "~/lib/formats";
import PixIcon from "@/assets/images/pix_icon.png?url"
import BitcoinIcon from "@/assets/images/bitcoin_icon.png?url"

const { items, totalItems, totalPrice } = useCart()
const showPaymentModal = ref(false)
const paymentMethod = ref<"pix" | "bitcoin" | null>(null)
const copied = ref(false)
const pixInputRef = ref<HTMLInputElement | null>(null)

const pixInfo = {
  key: 'noronha.lurdes@gmail.com', // TODO: substituir pelo e-mail da Lurdes
  name: 'Lourdes Noronha',
  city: 'SAO PAULO',
  message: 'Pagamento Ospadaria',
  value: computed(() => totalPrice.value)
}

const pix = computed(() => {
  try {
    return QrCodePix({
      version: '01',
      key: pixInfo.key,
      name: pixInfo.name,
      city: pixInfo.city,
      message: pixInfo.message,
      value: pixInfo.value.value
    })
  } catch (error) {
    console.error('Error generating PIX code:', error)
    return ''
  }
})

const pixCopiaCola = ref("")
const pixQrCode = ref("")

const copyPixCode = () => {
  if (pixInputRef.value) {
    pixInputRef.value.select()
    document.execCommand('copy')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

async function openPaymentModal() {
  if (totalItems.value <= 0) return
  showPaymentModal.value = true

  try {
    pixCopiaCola.value = await pix.value.payload()
    pixQrCode.value = await pix.value.base64()
  } catch (e) {
    console.error('Erro ao gerar código PIX:', e)
  }
}

function setPaymentMethod(type: "pix" | "bitcoin") {
  paymentMethod.value = type;
}

watch(showPaymentModal, (newVal) => {
  if (!newVal) paymentMethod.value = null;
})

</script>