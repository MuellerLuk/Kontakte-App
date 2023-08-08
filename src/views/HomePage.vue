
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kontakte</ion-title>
        <ion-button router-link="New">+</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
          <ion-item v-for="contact in contacts" :key="contact.id">
            <ion-label>{{ contact.name }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonButton, useIonRouter, IonLabel } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { Contacts, PhoneType, EmailType } from '@capacitor-community/contacts';
defineComponent({
  methods: {
    navigateToCreation() {
      const ionRouter = useIonRouter();
      ionRouter.push("/createNewContact");
    },
    
    async loadContacts() {
          const projection = {
            name: true,
            phones: true,
            postalAddresses: true,
          };
          try {
            const { contacts: loadedContacts } = await Contacts.getContacts({
              projection,
            });
            contacts.value = loadedContacts;
          } catch (error) {
            console.error("Error loading contacts:", error);
          }
        }
  },
});
export default {
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
    created() {       
        
        const contacts = ref([]);

        

        loadContacts();
    }
}
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
#container a {
  text-decoration: none;
}
</style>
