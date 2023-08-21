<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Detailansicht</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
          <ion-item>
            <ion-label>Vorname:</ion-label>
            <ion-text v-if="contact">{{ contact?.name.given }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Nachname:</ion-label>
            <ion-text v-if="contact">{{ contact?.name.family }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Telefonnummer:</ion-label>
            <ion-text v-if="contact">{{ contact?.phones[0].number }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>E-Mail:</ion-label>
            <ion-text v-if="contact">{{ contact?.emails[0].address }}</ion-text>
          </ion-item>
          <ion-item>
            <ion-label>Geburtstag:</ion-label>
            <ion-text v-if="contact">{{ contact?.birthday.day }}{{'.'}}{{ contact?.birthday.month }}{{'.'}}{{ contact?.birthday.year }}</ion-text>
          </ion-item>

          <!-- Button zum Speichern der Eingabe und zum Abbrechen -->
          <ion-button @click="remove" router-link="/home">Löschen</ion-button>
          <ion-button @click="cancel" router-link="/home">Abbrechen</ion-button>

          <!-- Speichern der eingegebenen Daten -->
          <div v-if="showValue">
            <p>Sie haben eingegeben: {{ firstname }}</p>
            <p>Sie haben eingegeben: {{ kontakte }}</p>
          </div>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonItem, IonLabel, IonList, 
  IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonText, useIonRouter, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Contacts } from '@capacitor-community/contacts';


export default defineComponent({
  components: {
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonText,
    IonToolbar
  },
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  methods: {
    async remove() {
      try {
        await Contacts.deleteContact({
          contactId: contact.id
        });
      } catch (error) {
        console.error("Error deleting contact: ", error);
      }
    },

    cancel() {
      return modalController.dismiss(null, "cancel");
    }
  }
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
#container a {
  text-decoration: none;
}
</style>
