<template>
  <ion-page @ionViewDidEnter="loadContacts">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kontakte</ion-title>
        <ion-button @click="navigateToNewContact">+</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
          <ion-item v-for="contact in contacts" :key="contact" @click="openContactDetails(contact)">
            <ion-label>{{ contact.name.display }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonButton, IonLabel, useIonRouter, modalController } from '@ionic/vue';
import { defineComponent, ref, watch } from 'vue';
import { Dialog } from '@capacitor/dialog';
import { Contacts } from '@capacitor-community/contacts';
import ContactDetails from '../components/ContactDetails.vue';

export default defineComponent({
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
  },

  setup() {
    const ionRouter = useIonRouter();
    const contacts = ref([]);

    async function checkAndRequestPermissions() {
    const permissionStatus = await Contacts.checkPermissions();

    if (permissionStatus.contacts !== 'granted') {
      const result = await Dialog.confirm({


        title: 'Berechtigungen erforderlich',
        message: 'Die App benötigt Zugriff auf deine Kontakte. Möchtest du die Berechtigungen erteilen?',
        cancelButtonTitle: 'Abbrechen',
        okButtonTitle: 'Berechtigungen erteilen',
      });

      if (result) {
        const permissionResult = await Contacts.requestPermissions();

        if (permissionResult.contacts === 'granted') {
          await loadContacts();
        }
      }
    } else {
      await loadContacts();
    }
  }

    async function loadContacts() {
      const projection = {
        name: true,
        phones: true,
        postalAddresses: true,
      };
      try {
        const { contacts: loadedContacts } = await Contacts.getContacts({
          projection,
        });
        const sortedContacts = loadedContacts.sort((a, b) => {
          const nameA = a.name.display.toLowerCase();
          const nameB = b.name.display.toLowerCase();
          return nameA.localeCompare(nameB);
        });

        contacts.value = sortedContacts;
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    }

    async function openContactDetails(contact) {
      const modal = await modalController.create({
        component: ContactDetails,
        componentProps: {
          contact: contact
        },
        
      });
      modal.onDidDismiss().then(() => {
          loadContacts();
        });
      modal.present();
    }

    function navigateToNewContact() {
      ionRouter.push('/New');
    }

    return {
      contacts,
      loadContacts,
      openContactDetails,
      navigateToNewContact,
      checkAndRequestPermissions
    };
  },

  async ionViewDidEnter() {
    await this.checkAndRequestPermissions();
    await this.loadContacts();
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
</style>
