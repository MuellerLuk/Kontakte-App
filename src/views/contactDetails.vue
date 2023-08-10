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
              <ion-input required v-model="firstname" placeholder="Vorname"></ion-input>
        </ion-item>
        <ion-item>
              <ion-input required v-model="lastname" placeholder="Nachname"></ion-input>
        </ion-item>
        <ion-item>
               <ion-input required v-model="phonenumber" placeholder="Telefonnummer"></ion-input>
        </ion-item>
        <ion-item>
                <ion-input required v-model="email" placeholder="E-Mail"></ion-input>
        </ion-item>
        <ion-item>
                <ion-input required v-model="birthday" placeholder="Geburtstag"></ion-input>
        </ion-item>

            <!-- Button zum Speichern der Eingabe und zum Abbrechen -->
                <ion-button @click="delete" router-link="Home">Löschen</ion-button>
                <ion-button @click="back" router-link="Home">Zurück</ion-button>

                <!-- Speichern der eingegebenen Dates -->
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
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Contacts, PhoneType, EmailType } from '@capacitor-community/contacts';

defineComponent({
  methods: {
    navigateToHome() {
      const ionRouter = useIonRouter();
      ionRouter.replace("/HomePage");
    }
  },
});

export default {
components: {
IonInput,
IonButton,
IonContent,
IonHeader,
IonItem,
IonList,
IonPage,
IonTitle,
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
            showValue: false
      }
    },
    methods: {
        async delete() {
          this.showValue = true;

          if (this.contacts && this.contacts.length > 0) {
        const contactIndexToRemove = this.contacts.findIndex(contact => {
          return (
            contact.firstname === this.firstname &&
            contact.lastname === this.lastname &&
            contact.phonenumber === this.phonenumber &&
            contact.email === this.email &&
            contact.birthday === this.birthday
          );
        });

        if (contactIndexToRemove !== -1) {
          // Entferne den Kontakt aus der Liste
          this.contacts.splice(contactIndexToRemove, 1);
        }
      }
    },

            
       back() {
          this.firstname= '';
          this.lastname = '';
          this.phonenumber= '';
          this.email= '';
          this.birthday= ''
       }
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
