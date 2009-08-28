function toggle_persist_groups(persist_groups) {
  if(persist_groups) {
    $('persist_groups_assignment').enable();
    $('persist_groups_assignment_style').removeClassName('disable');
    $('persist_groups_assignment').onchange();
    $('is_group_assignment').disable();
    $('is_group_assignment').addClassName('disable');
    $('student_form_groups').disable();
    $('student_form_groups_style').addClassName('disable');
    $('assignment_group_min').disable();
    $('assignment_group_max').disable();
    $('group_limit_style').addClassName('disable')
    $('assignment_group_name_autogenerated').disable();    
  } else {
    $('persist_groups_assignment').disable();
    $('persist_groups_assignment_style').addClassName('disable');
    $('is_group_assignment').enable();
    $('is_group_assignment').removeClassName('disable');
    toggle_group_assignment($F('is_group_assignment'));
  }
}

function toggle_group_assignment(is_group_assignment) {
  $('is_group_assignment').setValue(is_group_assignment);
  if(is_group_assignment) {
    $('student_form_groups').enable();
    $('student_form_groups_style').removeClassName('disable');
    $('persist_groups').enable();
    $('persist_groups_assignment_style').removeClassName('disable');
    toggle_student_form_groups($F('student_form_groups'));
  } else {
    $('assignment_group_min').disable();
    $('assignment_group_max').disable();
    $('group_limit_style').addClassName('disable');
    $('student_form_groups').disable();
    $('student_form_groups_style').addClassName('disable');
    $('assignment_group_name_autogenerated').disable();
    $('group_name_autogenerated_style').addClassName('disable');
    $('persist_groups').disable();
    $('persist_groups_assignment_style').addClassName('disable');
  }
}

function toggle_student_form_groups(student_form_groups) {
  if(student_form_groups) {
    $('assignment_group_min').enable();
    $('assignment_group_max').enable();
    $('group_limit_style').removeClassName('disable');
    $('assignment_group_name_autogenerated').setValue(true);
    $('assignment_group_name_autogenerated').disable();
    $('group_name_autogenerated_style').addClassName('disable');
  } else {
    $('assignment_group_min').disable();
    $('assignment_group_max').disable();
    $('group_limit_style').addClassName('disable');
    $('assignment_group_name_autogenerated').enable();  
    $('group_name_autogenerated_style').removeClassName('disable');
  }
}

function request_group_properties(assignment_id) {
/*  new Ajax.Request('update_group_properties_on_dependency', {asynchronous:true, evalScripts:true, parameters:'assignment_id=' + $F('assignment_dependency_list')}*/
}

function update_group_properties(is_group_assignment, student_form_groups, group_min, group_max, group_name_autogenerated) {
 $('is_group_assignment').setValue(is_group_assignment);
 $('student_form_groups').setValue(student_form_groups);
 $('assignment_group_min').setValue(group_min);
 $('assignment_group_max').setValue(group_max);
 $('assignment_group_name_autogenerated').setValue(group_name_autogenerated);
 
 $('is_group_assignment').disable();
 $('is_group_assignment').addClassName('disable');
 $('student_form_groups').disable();
 $('student_form_groups_style').addClassName('disable');
 $('assignment_group_min').disable();
 $('assignment_group_max').disable();
 $('group_limit_style').addClassName('disable');
 $('assignment_group_name_autogenerated').disable();
 $('group_name_autogenerated_style').addClassName('disable');

}

function add_assignment_file() {
  var new_assignment_file_div = new Element('div', {'class': 'assignment_file'})
  var new_assignment_file = new Element('input', {'type': 'text', 'name': 'assignment_files[]'})
  new_assignment_file.observe('keydown', function(e) {
    if(e.keyCode == Event.KEY_RETURN) {
      e.stop();
    }
  });
  var remove_link = new Element('a', {'href': 'javascript:void(0);'})
  remove_link.update('x')
  remove_link.observe('click', function(e) {
    $(new_assignment_file_div).remove();
  });
  new_assignment_file_div.insert(new_assignment_file);
  new_assignment_file.insert({'after': remove_link});
  $('assignment_files').insert(new_assignment_file_div);
  $(new_assignment_file).activate();
}

function default_group_fields() {
  toggle_persist_groups(false);
  toggle_group_assignment(false);
}

function update_due_date(new_due_date) {
  grace_periods.set_due_date(new_due_date);
  penalty_periods.set_due_date(new_due_date);
  grace_periods.refresh();
  penalty_periods.refresh();
}

function refresh_due_date() {
  update_due_date($F('assignment_due_date'));
}

function change_submission_rule() {
  $$('.period').each(function(node) { node.removeClassName('disabled'); });
  $$('.period input').each(function(node) {
    $(node).enable();
  });
  
  if($('grace_period_submission_rule').getValue() == null) {
     // Disable any grace_period_submission_rule periods 
    $$('#grace_periods .period').each(function(node) { node.addClassName('disabled'); });
    $$('#grace_periods .period input').each(function(node){node.disable();});
  }
  if($('penalty_period_submission_rule').getValue() == null) {
     // Disable any grace_period_submission_rule periods 
    $$('#penalty_periods .period').each(function(node) { node.addClassName('disabled'); });
    $$('#penalty_periods .period input').each(function(node){node.disable();});
  }

}
