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
              <ion-text v-if="contact.name.given">{{ contact?.name.given }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Nachname:</ion-label>
              <ion-text v-if="contact.name.family">{{ contact?.name.family }}</ion-text>
            </ion-item>
            <ion-item @click="callContact(contact)">
              <ion-label>Telefonnummer:</ion-label>
              <ion-text v-if="contact.phones[0].number">{{ contact?.phones[0].number }}</ion-text>
            </ion-item>
            <ion-item @click="writeEmail(contact)">
              <ion-label>E-Mail:</ion-label>
              <ion-text v-if="contact.emails[0].address">{{ contact.emails[0].address }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Geburtstag:</ion-label>
              <ion-text v-if="contact?.birthday?.day && contact?.birthday?.month && contact?.birthday?.year">{{ contact?.birthday?.day }}{{'.'}}{{ contact?.birthday?.month }}{{'.'}}{{ contact?.birthday?.year }}</ion-text>
            </ion-item>
  
            <ion-button @click="deleteContact" router-link="Home">Löschen</ion-button>
            <ion-button @click="cancel" router-link="Home">Abbrechen</ion-button>
  
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
  import { Dialog } from '@capacitor/dialog';
  
  
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
  
    data(){
          return{
              firstname: '',
              lastname: '',
              phonenumber: '',
              email: '',
              birthday: '',
              kontakte: [],
        }
      },
  
    props: {
      contact: {
        type: Object,
        required: true
      }
    },
    methods: {
      async deleteContact() {
        const result = await Dialog.confirm({
            title: 'Kontakt löschen',
            message: 'Möchten Sie den Kontakt wirklich löschen?',
            cancelButtonTitle: 'Abbrechen',
            okButtonTitle: 'Löschen',
          });
          
          if(result) {
            try {       
              console.log(this.contact)
              await Contacts.deleteContact({
                contactId: this.contact?.contactId
              });
            } catch (error) {
              console.error("Error deleting contact: ", error);
            }
            return modalController.dismiss(null, "deleteContact");
          }
      },
      callContact() {
        const phoneNumbers = this.contact.phones || [];
        if (phoneNumbers.length > 0) {
          const phoneNumber = phoneNumbers[0].number;
          const telURL = `tel:${phoneNumber}`;
  
          window.location.href = telURL;
        } else {
          console.warn("No phone numbers available for this contact.");
        }
      },
      
      writeEmail() {
        const emailAddresses = this.contact.emails || [];
        if (emailAddresses.length > 0) {
          const emailAddress = emailAddresses[0].address;
          const mailtoURL = `mailto:${emailAddress}`;
  
          window.location.href = mailtoURL;
        } else {
          console.warn("No email addresses available for this contact.");
        }
      },
  
      navigateToHome() {
        const ionRouter = useIonRouter();
        ionRouter.replace("/HomePage");
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