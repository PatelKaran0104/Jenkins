trigger CaseTrigger on Case (before insert, before update) {
    // for (Case newCase : Trigger.new) {
    //     // Set the origin to 'Web'
    //     newCase.Origin = 'Web';
        
    //     // Create DMLOptions to bypass the default case assignment rule
    //     Database.DMLOptions dmo = new Database.DMLOptions();
    //     dmo.assignmentRuleHeader.useDefaultRule = false;

    //     // Insert the case with DMLOptions
    //     Database.SaveResult result = Database.insert(newCase, dmo);

    //     if (result.isSuccess()) {
    //         if (newCase.OwnerId == null) {
    //             System.debug('The case bypassed the case assignment rule.' + newCase.OwnerId);
    //         } else {
    //             System.debug('The case was assigned an owner.'+newCase.OwnerId);
    //         }
    //     } else {
    //         // Handle the insert failure
    //         for (Database.Error error : result.getErrors()) {
    //             System.debug('Error inserting the case: ' + error.getMessage());
    //         }
    //     }
    // }
}